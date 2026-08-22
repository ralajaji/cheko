package com.cheko.backend.controller;

import com.cheko.backend.model.MenuItem;
import com.cheko.backend.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    public List<MenuItem> getMenu(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) List<String> category) {
        return menuService.getMenu(search, category);
    }
}