"""Unit tests for Logixa Flow Cargo Damage Audit and Route Optimizer."""

import pytest
from app.services.cargo_audit import CargoAuditService
from app.services.route_optimizer import RouteOptimizerService


def test_cargo_damage_analysis_with_defects():
    result = CargoAuditService.analyze_cargo_damage(
        tracking_number="LGF-MM-2026-9921",
        cargo_type="Precision Electronics",
        declared_value_usd=50000.0,
        tamper_seal_flag=True,
        reported_incident_notes="Severe drop impact and lateral surface dent occurred during rough berth unloading.",
    )
    
    assert result.tracking_number == "LGF-MM-2026-9921"
    assert result.pre_transit_integrity_score > 90.0
    assert result.post_transit_integrity_score < 75.0
    assert result.claim_recommended is True
    assert result.estimated_damage_usd > 10000.0
    assert len(result.defects_detected) >= 2
    assert "LOGIXA-AUDIT-" in result.verification_hash


def test_route_optimizer_multi_strategy():
    plans = RouteOptimizerService.optimize_route(
        origin="Yangon Port (MITT)",
        destination="Mandalay Logistics Hub",
        vehicle_type="container_hauler",
        prioritize="FUEL_EFFICIENT",
    )
    
    assert len(plans) == 3
    primary = plans[0]
    assert primary.strategy == "FUEL_EFFICIENT"
    assert primary.total_distance_km > 500.0
    assert primary.estimated_fuel_liters > 150.0
    assert primary.co2_emissions_kg > 400.0
    assert len(primary.waypoints) >= 4
