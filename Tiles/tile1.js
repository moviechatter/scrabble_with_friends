const ScrabbleTile = ({x}) => {

    const style = {
      width: '100px',
      height: '100px',
      border: '5px solid brown',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '60px',
    }
  
    return (
      <span style={style} className="scrabble">
        {letter}
      </span>
    );
  }
  
  // Usage:
  <ScrabbleTile letter="X"/>