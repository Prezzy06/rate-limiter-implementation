package com.rishikesh.springboot.ratelimiter.service.impl;

import com.rishikesh.springboot.ratelimiter.service.RateLimiterService;
import org.springframework.stereotype.Service;

@Service("token")
public class TokenBucketRateLimiter implements RateLimiterService {
    private final int capacity = 10;       // max number of tokens
    private double tokens = capacity;      // current tokens
    private final double refillRate = 1.0; // tokens per second
    private long lastRefillTimestamp = System.nanoTime();

    @Override
    public synchronized boolean allowRequest() {
        long now = System.nanoTime();
        double secondsSinceLastRefill = (now - lastRefillTimestamp) / 1_000_000_000.0;
        tokens = Math.min(capacity, tokens + secondsSinceLastRefill * refillRate);
        lastRefillTimestamp = now;

        if (tokens >= 1) {
            tokens -= 1;
            return true;
        }
        return false;
    }
}
