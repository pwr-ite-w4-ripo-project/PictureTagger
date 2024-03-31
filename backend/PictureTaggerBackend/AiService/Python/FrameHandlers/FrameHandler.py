from abc import ABC, abstractclassmethod
from typeAliases import RgbImage, Labels

class FrameHandler(ABC):
    @abstractclassmethod
    def handle(self, frame: RgbImage) -> tuple[RgbImage, Labels]:
        pass