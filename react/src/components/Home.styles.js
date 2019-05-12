export const styles = {
  button: {
    height: '200px',
    width: '200px',
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      flexGrow: '0',
      margin: '.5rem',
      width: '20%',
    }
  },
  pageTitle: {
    border: '3px solid #333',
    borderRadius: '40px 40px 0 0',
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '80px',
    maxWidth: '1000px',
    opacity: '.8',
    textShadow: [
      [ '3px','3px',0,'#000' ],
      [ '-1px','-1px',0,'#000' ],
      [ '1px','-1px',0,'#000' ],
      [ '-1px','1px',0,'#000' ],
      [ '1px','1px',0,'#000' ],
    ],
    // backgroundColor: '<?php echo $color', ?>',
    padding: '1rem 0 2rem',
    margin: '.5rem auto 3rem',
  },
  root: {
    padding: '2rem 0',
    textAlign: 'center',
  },
  section: {
    padding: '1rem 2rem 2rem',
  }
};