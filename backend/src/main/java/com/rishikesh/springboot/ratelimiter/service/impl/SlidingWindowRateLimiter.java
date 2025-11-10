package com.rishikesh.springboot.ratelimiter.service.impl;

import com.rishikesh.springboot.ratelimiter.service.RateLimiterService;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service("sliding")
public class SlidingWindowRateLimiter implements RateLimiterService {
    private final int maxRequests = 10;
    private final long windowSizeInMillis = 10_000; // 10 seconds

    private final Queue<Long> requestTimestamps = new LinkedList<>();

    @Override
    public synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();

        // Remove timestamps outside the window
        while (!requestTimestamps.isEmpty() &&
                (now - requestTimestamps.peek()) >= windowSizeInMillis) {
            requestTimestamps.poll();
        }

        if (requestTimestamps.size() < maxRequests) {
            requestTimestamps.offer(now);
            return true;
        }
        return false;
    }
}
