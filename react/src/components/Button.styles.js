export const styles = {
  border: '3px solid #eee',
  borderRadius: '3px',
  boxShadow: '#bbb 0 0 0 2px inset',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '10px',
  opacity: '.4',
  padding: '1rem 5rem',
  '&:hover, &:focus': {
    cursor: 'pointer',
    opacity: '1',
  },
  '&.active': {
    borderColor: 'red',
    boxShadow: 'white 0 0 0 2px inset',
    opacity: '1',
  }
};