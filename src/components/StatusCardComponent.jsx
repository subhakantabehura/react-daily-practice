import styled from "styled-components";

const Card = styled.div`
  padding: 12px;
  border-radius: 6px;
  color: white;
  background-color: ${(props) => {
    switch (props.type) {
      case 'success':
        return '#4CAF50'; // Green
      case 'error':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Grey fallback
    }
  }};
    `;

function StatusCardComponent({ type, message }) {
  return <Card type={type}>{message}</Card>;
}

export default StatusCardComponent;
