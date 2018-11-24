package com.examocean.file.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;



public class RoleFilter {
    public static String getRole(HttpServletRequest request, Role targetRole) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            System.out.println("no cookies");
            return null;
        } else {

            for (int i = 0; i < cookies.length; i++) {
                Cookie one = cookies[i];
                if (one.getName().equals("role")) {
                    String role = one.getValue();
                    if (null != role && role.equals(targetRole.getRole())) {
                        int j;
                        for (j = 0; j < cookies.length; j++) {
                            Cookie user = cookies[j];
                            if (user.getName().equals("user")) {
                                return user.getValue();
                            }
                        }
                        if (j == cookies.length) {
                            return null;
                        }
                    } else {
                        return null;
                    }

                }
            }
            return null;
        }

    }
}
