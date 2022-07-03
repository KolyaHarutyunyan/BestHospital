import styled from "styled-components";
import Carousel from "nuka-carousel";

export const MainCarouselStyled = styled(Carousel)`
	height: ${({ height }) => height || "200px"}!important;

	& .slider-list {
		cursor: unset !important;
	}

	& .slider-control-centerleft {
		& button {
			display: none !important;
		}
	}

	& > .slider-control-bottomcenter {
		& > ul > li > button > svg {
			width: 8px !important;
			height: 8px !important;
			border-radius: 50% !important;
			background-color: ${({ bottomColor }) => bottomColor || '#37474F'}!important;
			border: none !important;
			& > circle {
				display: none;
			}
		}
		& > ul > li.active > button > svg {
			width: 24px !important;
			border-radius: 4px !important;
		}
	}
`;
