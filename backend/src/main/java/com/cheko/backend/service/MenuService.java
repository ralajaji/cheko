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

    public List<MenuItem> getMenu(String search, List<String> categories) {
        String normalizedSearch = StringUtils.hasText(search) ? search.trim() : null;

        List<String> normalizedCategories = categories == null
                ? List.of()
                : categories.stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .distinct()
                .toList();

        return normalizedCategories.isEmpty()
                ? menuItemRepository.findBySearch(normalizedSearch)
                : menuItemRepository.findBySearchAndCategories(normalizedSearch, normalizedCategories);
    }
}