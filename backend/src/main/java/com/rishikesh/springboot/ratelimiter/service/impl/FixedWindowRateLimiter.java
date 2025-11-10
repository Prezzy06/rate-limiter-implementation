package com.rishikesh.springboot.ratelimiter.service.impl;

import com.rishikesh.springboot.ratelimiter.service.RateLimiterService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service("fixed")
public class FixedWindowRateLimiter implements RateLimiterService {
    private final int maxRequests = 10;        // requests allowed per window
    private final long windowSizeInMillis = 10_000; // 10 seconds

    private int requestCount = 0;
    private long windowStart = System.currentTimeMillis();

    @Override
    public synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();

        if (now - windowStart >= windowSizeInMillis) {
            windowStart = now;
            requestCount = 0;
        }

        if (requestCount < maxRequests) {
            requestCount++;
            return true;
        }
        return false;
    }
}
