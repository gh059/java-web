package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.vertx.ext.web.RoutingContext;
import org.acme.login.User;

// 파일 업로드 및 유틸리티 임포트
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.Map;

@Path("/") // 기본 경로가 최상위 /
public class AuthResource {

    @Inject
    RoutingContext context; // Quarkus Vert.x 세션 접근

    // ==========================================
    // 1. 메인 페이지 분기 (GET /)
    // ==========================================
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response mainPage() {
        String loginUser = context.session().get("loginUser");
        System.out.println("=== [GET /] 세션 ID : " + context.session().id());
        System.out.println("=== [GET /] loginUser : " + loginUser);
        
        String htmlPath = (loginUser != null)
            ? "META-INF/resources/login/main_after_login.html"
            : "META-INF/resources/main_index.html";
            
        InputStream html = getClass().getClassLoader().getResourceAsStream(htmlPath);
        return Response.ok(html).build();
    }

    // ==========================================
    // 2. 로그인 페이지 이동 및 처리
    // ==========================================
    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public Response loginPage() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/login.html");
        return Response.ok(html).build();
    }

    @POST
    @Path("/login_check")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
            @FormParam("username") String username,
            @FormParam("password") String password) {

        User user = User.findByUsername(username); // 아이디 조회
        if (user == null || !user.password.equals(password)) { // 존재 및 비밀번호 확인
            return Response
                .seeOther(URI.create("/login?error=1"))
                .build();
        }
        
        // 세션에 로그인 정보 저장
        context.session().put("loginUser", username);

        return Response
            .seeOther(URI.create("/after_login"))
            .build();
    }
    
    @GET
    @Path("/after_login")
    @Produces(MediaType.TEXT_HTML)
    public Response afterLogin() {
        // 세션 체크: 로그인 안 한 사용자 차단
        String loginUser = context.session().get("loginUser");

        // 세션 내용 로그 출력
        System.out.println("=== 세션 ID : " + context.session().id());
        System.out.println("=== loginUser : " + loginUser);

        if (loginUser == null) {
            // 세션 없음 → 로그인 페이지로 강제 이동
            return Response
                .seeOther(URI.create("/login"))
                .build();
        }

        // 세션 있음 → 로그인 후 HTML 반환
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/main_after_login.html");
        return Response.ok(html).build();
    }

    // ==========================================
    // 3. 로그아웃 처리
    // ==========================================
    @GET
    @Path("/logout")
    public Response logout() {
        // 로그아웃 전 세션 정보 출력
        System.out.println("=== 로그아웃 전 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 세션 값 : " + context.session().data());
        System.out.println("=== 로그아웃 전 loginUser : " + context.session().get("loginUser"));
        
        // 세션 전체 삭제
        context.session().destroy();
    
        // 로그아웃 후 세션 정보 출력
        System.out.println("=== 로그아웃 후 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 세션 값 : " + context.session().data());
        System.out.println("=== 로그아웃 후 loginUser : " + context.session().get("loginUser"));
    
        return Response
            .seeOther(URI.create("/"))
            .build();
    }

    // ==========================================
    // 4. 회원가입 페이지 이동 및 처리
    // ==========================================
    @GET
    @Path("/register")
    @Produces(MediaType.TEXT_HTML)
    public Response registerPage() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/register.html");
        return Response.ok(html).build();
    }

    @POST
    @Path("/register_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_HTML)
    public Response registerCheck(
            @FormParam("username") String username,
            @FormParam("password") String password, // SHA-256 해시값
            @FormParam("email") String email,
            @FormParam("phone") String phone) {
    
        // ① 아이디 중복 체크
        if (User.findByUsername(username) != null) {
            return Response
                .seeOther(URI.create("/register?error=duplicate_username"))
                .build();
        }
    
        // ② 이메일 중복 체크
        if (User.findByEmail(email) != null) {
            return Response
                .seeOther(URI.create("/register?error=duplicate_email"))
                .build();
        }
        
        // ③ DB 삽입
        User newUser = new User();
        newUser.username = username;
        newUser.password = password; // 해시값 저장
        newUser.email = email;
        newUser.phone = phone;
        newUser.persist();
    
        // ④ 가입 완료 페이지로 이동
        return Response
            .seeOther(URI.create("/register_success"))
            .build();
    }

    @GET
    @Path("/register_success")
    @Produces(MediaType.TEXT_HTML)
    public Response registerSuccess() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/register_success.html");
        return Response.ok(html).build();
    }

    // ==========================================
    // 5. 마이프로필 영역 (화면출력 + 비동기 데이터 API)
    // ==========================================
    
    /**
     * 마이페이지 HTML 레이아웃 반환 엔드포인트
     */
    @GET
    @Path("/profile")
    @Produces(MediaType.TEXT_HTML)
    public Response profilePage() {
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response.seeOther(URI.create("/login")).build();
        }

        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/profile.html");
            
        if (html == null) {
            return Response.status(404)
                .entity("<h1>404 Not Found</h1><p>profile.html 파일을 찾을 수 없습니다.</p>")
                .build();
        }
            
        return Response.ok(html).build();
    }

    /**
     * 자바스크립트가 유저 데이터를 받아가는 비동기 JSON 엔드포인트
     */
    @GET
    @Path("/profile/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response profileInfo() {
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response.status(401).build();
        }
        
        User user = User.findByUsername(loginUser);

        context.session().put("userEmail", user.email);
        context.session().put("userPhone", user.phone);
        context.session().put("profileImage", user.profileImage != null ? user.profileImage : "default.png");
        
        return Response.ok(
            Map.of(
                "username", user.username,
                "email", user.email != null ? user.email : "",
                "phone", user.phone != null ? user.phone : "",
                "profileImage", user.profileImage != null ? user.profileImage : ""
            )
        ).build();
    }

    /**
     * 프로필 사진 업로드 처리 엔드포인트 (중괄호 누락 및 방어코드 수정 완료)
     */
    @POST
    @Path("/profile/upload")
    @Transactional
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response profileUpload(@RestForm("profileImage") FileUpload file) {
        // ① 세션 체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response.seeOther(URI.create("/login")).build();
        }

        try {
            // 파일 미선택 방어 코드
            if (file == null || file.fileName() == null || file.fileName().isEmpty()) {
                return Response.seeOther(URI.create("/profile?error=no_file")).build();
            }

            // ② 확장자 검사
            String original = file.fileName();
            String ext = original.substring(original.lastIndexOf('.') + 1).toLowerCase();
            if (!ext.matches("jpg|jpeg|png|gif|webp")) {
                return Response.seeOther(URI.create("/profile?error=invalid_type")).build();
            }

            // ③ 파일 크기 검사 (5MB)
            if (file.size() > 5 * 1024 * 1024) {
                return Response.seeOther(URI.create("/profile?error=too_large")).build();
            }

            // ④ UUID 파일명 생성 및 저장
            String newFileName = UUID.randomUUID() + "." + ext;
            java.nio.file.Path uploadDir = Paths.get("src/main/resources/META-INF/resources/uploads/profile");
            java.nio.file.Files.createDirectories(uploadDir);
            java.nio.file.Files.copy(
                file.uploadedFile(),
                uploadDir.resolve(newFileName),
                java.nio.file.StandardCopyOption.REPLACE_EXISTING
            );

            // ⑤ DB 업데이트 및 영속화 반영
            User user = User.findByUsername(loginUser);
            if (user != null) {
                user.profileImage = newFileName;
                user.persist(); // 변경 내역을 확실하게 저장합니다.
            }

            return Response.seeOther(URI.create("/profile?success=1")).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.seeOther(URI.create("/profile?error=upload_fail")).build();
        }
    }
}