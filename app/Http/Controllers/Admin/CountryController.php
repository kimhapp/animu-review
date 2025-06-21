<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CountryRequest;
use App\Models\Country;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CountryController extends Controller
{
    // List all countries
    public function create()
    {
        return Inertia::render('admin/country', [
            'countries' => Country::all(),
        ]);
    }

    // Store a new country
    public function store(CountryRequest $request): RedirectResponse
    {
        Country::create($request->validated());

        return redirect()->route('admin.country.index')
            ->with('success', 'Country created successfully.');
    }

    // Show edit form
    public function edit(Country $country)
    {
        return Inertia::render('admin/country-edit', [
            'country' => $country,
        ]);
    }

    // Update country
    public function update(CountryRequest $request, Country $country): RedirectResponse
    {
        $country->update($request->validated());

        return redirect()->route('admin.country.index')
            ->with('success', 'Country updated successfully.');
    }

    // Delete country
    public function destroy(Country $country): RedirectResponse
    {
        $country->delete();

        return redirect()->route('admin.country.index')
            ->with('success', 'Country deleted successfully.');
    }
}
