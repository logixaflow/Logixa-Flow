"""Logixa Cargo Intelligence & Optimization Router.

Provides endpoints for Computer Vision cargo damage inspection,
multi-modal route & fuel optimization, and live tracking telemetry.
"""

from __future__ import annotations

import time
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from app.services.cargo_audit import CargoAuditService, CargoInspectionResult
from app.services.route_optimizer import RouteOptimizerService, RoutePlan

router = APIRouter(prefix="/api/cargo", tags=["Cargo Intelligence"])


class DamageInspectionRequest(BaseModel):
    tracking_number: str = Field(..., min_length=4)
    cargo_type: str = "General Dry Container"
    declared_value_usd: float = 20000.0
    pre_transit_image_url: Optional[str] = None
    post_transit_image_url: Optional[str] = None
    tamper_seal_flag: bool = False
    reported_incident_notes: Optional[str] = None


class RouteOptimizationRequest(BaseModel):
    origin: str = "Yangon Port (MITT)"
    destination: str = "Mandalay Logistics Hub"
    vehicle_type: str = "container_hauler"
    prioritize: str = "FUEL_EFFICIENT"
    weather_alert: bool = False


@router.post("/damage-inspection", response_model=CargoInspectionResult)
def perform_damage_inspection(payload: DamageInspectionRequest) -> CargoInspectionResult:
    """Analyze pre vs post transit condition and detect structural defects."""
    return CargoAuditService.analyze_cargo_damage(
        tracking_number=payload.tracking_number,
        cargo_type=payload.cargo_type,
        declared_value_usd=payload.declared_value_usd,
        pre_transit_image_url=payload.pre_transit_image_url,
        post_transit_image_url=payload.post_transit_image_url,
        tamper_seal_flag=payload.tamper_seal_flag,
        reported_incident_notes=payload.reported_incident_notes,
    )


@router.post("/route-optimize", response_model=List[RoutePlan])
def optimize_freight_route(payload: RouteOptimizationRequest) -> List[RoutePlan]:
    """Compute comparative route plans with fuel, toll, and CO2 analytics."""
    return RouteOptimizerService.optimize_route(
        origin=payload.origin,
        destination=payload.destination,
        vehicle_type=payload.vehicle_type,
        prioritize=payload.prioritize,
        weather_alert=payload.weather_alert,
    )


@router.get("/track/{tracking_number}")
def get_public_tracking_status(tracking_number: str) -> Dict[str, Any]:
    """Public branded live tracking data for customers and consignees."""
    now = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    return {
        "tracking_number": tracking_number,
        "carrier": "Logixa Flow Freight Express",
        "origin": "Yangon Port (MITT), Myanmar",
        "destination": "Mandalay Industrial Zone Logistics Hub",
        "status": "IN_TRANSIT",
        "current_location": "Naypyitaw Central Expressway Interchange",
        "eta": "2026-11-23 16:30 UTC",
        "progress_percent": 68,
        "temperature_celsius": 4.2,  # Cold-chain sensor
        "humidity_percent": 55,
        "tamper_seal_verified": True,
        "driver": {
            "name": "Ko Min Thant",
            "vehicle_plate": "YGN-9B/4812",
            "contact_phone": "+959-798-112233"
        },
        "milestones": [
            {"step": "Manifest Clearance & Seal Lock", "location": "Yangon Port", "time": "2026-11-22 06:00", "completed": True},
            {"step": "Departed Maritime Terminal", "location": "MITT Gate 4", "time": "2026-11-22 07:15", "completed": True},
            {"step": "Weight Station & Highway Toll", "location": "Bago Interchange", "time": "2026-11-22 09:40", "completed": True},
            {"step": "En Route Central Corridor", "location": "Naypyitaw Checkpoint", "time": "2026-11-22 13:20", "completed": True},
            {"step": "Arrival & Visual Unloading Audit", "location": "Mandalay Logistics Hub", "time": "Pending", "completed": False},
        ],
        "last_updated": now,
    }
