package com.cheko.backend.service;

import com.cheko.backend.model.MenuItem;
import com.cheko.backend.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public List<MenuItem> getMenu(String search, String category) {
        String normalizedSearch = StringUtils.hasText(search) ? search.trim() : null;
        String normalizedCategory = StringUtils.hasText(category) ? category.trim() : null;
        return menuItemRepository.findByFilters(normalizedSearch, normalizedCategory);
    }
}