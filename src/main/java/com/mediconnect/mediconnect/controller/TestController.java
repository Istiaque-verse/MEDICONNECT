package com.mediconnect.mediconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediconnect.mediconnect.security.UserDetailsImpl;

@RestController
@RequestMapping("/test")
public class TestController {

  

    @GetMapping("/test")
    public String test() {
        return "✅ API is working!";
    }
}
