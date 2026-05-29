window.onload = function () {

  fetch("/profile/info")

    .then((res) => {

      if (!res.ok) {
        location.href = "/login";
        return null;
      }

      return res.json();
    })

    .then((data) => {

      if (!data) return;

      // 프로필 정보
      const usernameEl =
        document.getElementById("infoUsername");

      const emailEl =
        document.getElementById("infoEmail");

      const phoneEl =
        document.getElementById("infoPhone");

      if (usernameEl)
        usernameEl.textContent = data.username || "";

      if (emailEl)
        emailEl.textContent = data.email || "";

      if (phoneEl)
        phoneEl.textContent = data.phone || "";

      // 프로필 이미지
      const profileImg =
        document.getElementById("profileImg");

      if (
        profileImg &&
        data.profileImage &&
        data.profileImage !== "default.png"
      ) {

        profileImg.src =
          "/uploads/profile/" + data.profileImage;
      }

      // Tooltip
      const profileLink =
        document.getElementById("profileNavLink");

      if (profileLink) {

        profileLink.setAttribute(
          "data-bs-title",
          "👋 " + data.username
        );

        new bootstrap.Tooltip(profileLink, {
          trigger: "hover"
        });

      }

    })

    .catch((err) => {
      console.error(err);
    });

};