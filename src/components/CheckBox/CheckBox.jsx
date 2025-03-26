import styled from 'styled-components';
import PropTypes from "prop-types";

function Checkbox({text = "Checkbox"}) {
    return (
        <StyledWrapper>
            <div className="checkbox-wrapper-46">
                <input type="checkbox" id="cbx-46" className="inp-cbx"/>
                <label htmlFor="cbx-46" className="cbx"><span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"/></svg></span><span className="text-white text-sm">{text}</span>
                </label>
            </div>
        </StyledWrapper>
    );
}

Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
}

const StyledWrapper = styled.div`
    .checkbox-wrapper-46 input[type="checkbox"] {
        display: none;
        visibility: hidden;
    }

    .checkbox-wrapper-46 .cbx {
        margin: auto;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    .checkbox-wrapper-46 .cbx span {
        display: inline-block;
        vertical-align: middle;
        transform: translate3d(0, 0, 0);
    }

    .checkbox-wrapper-46 .cbx span:first-child {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid #9098a9;
        transition: all 0.2s ease;
    }

    .checkbox-wrapper-46 .cbx span:first-child svg {
        position: absolute;
        top: 3px;
        left: 2px;
        fill: none;
        stroke: #ffffff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
    }

    .checkbox-wrapper-46 .cbx span:first-child:before {
        content: "";
        width: 100%;
        height: 100%;
        background: #506eec;
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
    }

    .checkbox-wrapper-46 .cbx span:last-child {
        padding-left: 8px;
    }

    .checkbox-wrapper-46 .cbx:hover span:first-child {
        border-color: #506eec;
    }

    .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child {
        background: #506eec;
        border-color: #506eec;
        animation: wave-46 0.4s ease;
    }

    .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child svg {
        stroke-dashoffset: 0;
    }

    .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child:before {
        transform: scale(3.5);
        opacity: 0;
        transition: all 0.6s ease;
    }

    @keyframes wave-46 {
        50% {
            transform: scale(0.9);
        }
    }`;

export default Checkbox;