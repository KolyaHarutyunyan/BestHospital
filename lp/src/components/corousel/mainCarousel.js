import { MainCarouselStyled } from "./styles";

export const MainCarousel = ({ 
    children, 
    slidesToShow, 
    height, 
    bottomColor, 
    renderCenterLeftControls, 
    renderCenterRightControls, 
    renderBottomCenterControls,
    cellSpacing,
}) => {

    return (
        <MainCarouselStyled
            bottomColor={bottomColor}
            height={height}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            style={{ outline: "none" }}
            renderCenterLeftControls={renderCenterLeftControls}
            renderCenterRightControls={renderCenterRightControls}
            renderBottomCenterControls={renderBottomCenterControls}
            slideIndex={0}
            cellSpacing={cellSpacing}
        >
            {children}
        </MainCarouselStyled>
    );
};