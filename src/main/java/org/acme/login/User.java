package org.acme.login;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {
    public String username;
    public String password; // SHA-256 해시값 저장

    @Column(unique = true) // 이메일 중복 방지
    public String email;
    public String phone; // 연락처

    // 아이디로 조회
    public static User findByUsername(String username) {
        return find("username", username).firstResult();
    }
    // 이메일로 조회
    public static User findByEmail(String email) {
        return find("email", email).firstResult();
    }
}