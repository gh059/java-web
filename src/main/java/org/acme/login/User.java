package org.acme.login;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
@Entity
@Table(name = "users") // 예약어 충돌 방지: "user" → "users"
public class User extends PanacheEntity {
    public String username;
    public String password;
    
    // 사용자명으로 조회하는 정적 메서드
    public static User findByUsername(String username) {
        return find("username", username).firstResult();
    }
}
