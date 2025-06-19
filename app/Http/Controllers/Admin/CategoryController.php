<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Show all categories (and a form to create new)
    public function create()
    {
        return Inertia::render('admin/category', [
            'categories' => Category::all(),
        ]);
    }

    // Store a new category
    public function store(CategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());

        return redirect()->route('admin.category')
            ->with('success', 'Category created successfully.');
    }

    // Show edit form for a category
    public function edit(Category $category)
    {
        return Inertia::render('admin/category-edit', [
            'category' => $category,
        ]);
    }

    // Update a category
    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return redirect()->route('admin.category.index')
            ->with('success', 'Category updated successfully.');
    }

    // Delete a category
    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.category.index')
            ->with('success', 'Category deleted successfully.');
    }
}
