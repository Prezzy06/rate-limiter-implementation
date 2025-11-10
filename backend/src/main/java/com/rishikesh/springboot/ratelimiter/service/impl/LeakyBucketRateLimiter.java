package com.rishikesh.springboot.ratelimiter.service.impl;

import com.rishikesh.springboot.ratelimiter.service.RateLimiterService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service("leaky")
public class LeakyBucketRateLimiter implements RateLimiterService {
    private final int capacity = 10;
    private int water = 0;                 // current water in bucket
    private final double leakRate = 1.0;   // per second
    private long lastLeakTimestamp = System.nanoTime();

    @Override
    public synchronized boolean allowRequest() {
        long now = System.nanoTime();
        double secondsSinceLastLeak = (now - lastLeakTimestamp) / 1_000_000_000.0;
        int leaked = (int) (secondsSinceLastLeak * leakRate);
        if (leaked > 0) {
            water = Math.max(0, water - leaked);
            lastLeakTimestamp = now;
        }

        if (water < capacity) {
            water++;
            return true;
        }
        return false;
    }
}
