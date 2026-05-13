    package org.acme.login;
    import jakarta.ws.rs.*;
    import jakarta.ws.rs.core.MediaType;
    import jakarta.ws.rs.core.Response;
    import java.net.URI;
    import java.io.InputStream;
    @Path("/") // 기본 경로가 최상위 /
    public class AuthResource {
    // GET /login → 로그인 HTML 페이지 반환
    @GET
    @Path("/login") // 경로 명시
    @Produces(MediaType.TEXT_HTML) // 서버 → 클라
    public Response loginPage() {
    InputStream html = getClass()
    .getClassLoader()
    .getResourceAsStream("META-INF/resources/login/login.html");
    return Response.ok(html).build();
    }

    @POST
    @Path("/login_check")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // 클라 → 서버
    public Response loginCheck(
    @FormParam("username") String username,
    @FormParam("password") String password) {
    // [임시] 일단 로그인 성공 처리 (DB 체크 전)
    return Response
    .seeOther(URI.create("/login/main_after_login.html"))
    .build();
    }
}
