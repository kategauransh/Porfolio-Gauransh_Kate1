package com.gauransh.jwtauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/user")
    public ResponseEntity<?> getUserDashboard(Principal principal) {
        return ResponseEntity.ok(Map.of(
                "title", "Standard User Dashboard",
                "message", "Welcome, " + principal.getName() + "! You have successfully authenticated using JWT.",
                "features", List.of(
                        "Access standard files",
                        "View profile details",
                        "Update account preferences",
                        "Trigger basic data processing"
                ),
                "secureStamp", "USER_LEVEL_RESTRICTED"
        ));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAdminDashboard(Principal principal) {
        return ResponseEntity.ok(Map.of(
                "title", "Premium Administrator Console",
                "message", "Access Granted! Welcome to the secure admin workspace, " + principal.getName() + ".",
                "adminActions", List.of(
                        "Manage users & roles",
                        "View application metrics",
                        "Configure global API rate-limits",
                        "Purge cache & reload system configurations"
                ),
                "secureStamp", "ADMIN_LEVEL_RESTRICTED",
                "systemHealth", "100% Operations Healthy"
        ));
    }
}
