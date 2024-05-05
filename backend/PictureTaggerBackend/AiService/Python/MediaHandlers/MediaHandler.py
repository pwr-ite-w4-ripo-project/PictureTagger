from abc import ABC, abstractmethod
from typeAliases import RgbImage

class MediaHandler(ABC):
    @abstractmethod
    def handle(self, image: RgbImage, outputFilePath: str) -> None:
        pass