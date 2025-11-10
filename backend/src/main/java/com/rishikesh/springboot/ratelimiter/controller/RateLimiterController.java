package com.rishikesh.springboot.ratelimiter.controller;

import com.rishikesh.springboot.ratelimiter.service.RateLimiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class RateLimiterController {
    private final Map<String, RateLimiterService> algorithms;

    public RateLimiterController(Map<String, RateLimiterService> algorithms) {
        this.algorithms = algorithms;
    }

    @GetMapping("/{method}")
    public ResponseEntity<String> getData(@PathVariable String method){
        RateLimiterService limiter = algorithms.get(method.toLowerCase());

        if (limiter == null)
            return ResponseEntity.badRequest().body("Unknown rate limiter: " + method);

        if (limiter.allowRequest()) {
            return ResponseEntity.ok("✅ Request allowed by " + method + " limiter");
        } else {
            return ResponseEntity.status(429).body("❌ Too many requests (" + method + ")");
        }
    }
}
