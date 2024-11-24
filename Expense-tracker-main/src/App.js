import { useRef, useState } from 'react';

import { Typography, Box, styled,Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

// import Balance from
// import DownloadPDF from './Components/DownloadPDF';
import Balance from './Components/Balance';
import ExpenseCard from './Components/ExpenseCard';
import Transactions from './Components/Transactions';
import NewTransaction from './Components/NewTransaction';

const Header = styled(Typography)`
  margin: 10px 0px 0px 0px;
  color: white;
  font-size: 44px;
  // text-transform: uppercase;
  font-weight:700;
  text-align:center;
`;

const Subheader=styled(Typography)`
color:white;
font-size:18px;
margin-bottom:10px;
`;

const Component = styled(Box)`
  background: #FFF;
  margin-left :200px;
  padding: 15px;
  border-radius: 20px;
  display: flex;
  
  width: 800px;
  & > div {
    padding: 10px;
    width: 50%;
    height: 70vh;
  }
}
`;

const DownloadBtn=styled(Button)`
background-color:#7B68EE;
color:white;
hover:{
background-color:pink;
};
`;

function App() {
  
  const pdfRef=useRef();
  const DownloadPDF=()=>{

    const input=pdfRef.current;
    html2canvas(input).then((canvas)=>{
        const imgData=canvas.toDataURL('image/png');
        const pdf=new jsPDF('p','mm','a4',true);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=pdf.internal.pageSize.getHeight();
        const imgWidth=canvas.width;
        const imgHeight=canvas.height;
        const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
        const imgX=(pdfWidth-imgWidth*ratio)/2;
        const imgY=30;
        pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
        pdf.save('trackify.pdf');
    });
};

  const [transactions, setTransactions] = useState([
    { id: 2, text: 'Salary', amount: 3000},
    { id: 1, text: 'Snacks', amount: -20},
    { id: 3, text: 'Book', amount: -100},
    { id: 4, text: 'Bonus', amount: 1500 },
  ]);

  const deleteTransaction = (id) => {
    console.log(id);
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    console.log(transactions);
  }

  const addTransaction = (transaction) => {
    setTransactions(transactions => [transaction, ...transactions]);
    console.log(transaction);
    console.log(transactions);
  }


  return (
  
    <div className="App" ref={pdfRef}>
      <Header>Trackify</Header>
      <Subheader>Simplify your spending effortlessly</Subheader>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <NewTransaction addTransaction={addTransaction}/>
        </Box>
        <Box>
          <Transactions transactions={transactions} deleteTransaction={deleteTransaction}/>
          <DownloadBtn variant="contained" onClick={DownloadPDF}>Download PDF</DownloadBtn>
        </Box>
      </Component>

      <div>
      </div>
    </div>
    
  );
}

export default App;