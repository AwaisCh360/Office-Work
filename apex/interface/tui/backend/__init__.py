"""Backend bridge for external TUI clients."""

from apex.interface.tui.backend.controller import TuiController
from apex.interface.tui.backend.server import TuiBackendServer


__all__ = ["TuiBackendServer", "TuiController"]
