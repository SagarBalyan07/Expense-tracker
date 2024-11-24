
import { ListItemText, ListItem, styled, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const List = styled(ListItem)`
    display: flex;
    marginTop: 10px;
    border: 1px solid #F6F6F6;
`;
const Deleteiicon=styled(ListItemIcon)`
color:white;
`
const Transaction = ({transaction, deleteTransaction}) => {
    
    const sign = transaction.amount >= 0 ? '₹' : '-₹';
    const amount = sign + Math.abs(transaction.amount);
    const color = transaction.amount >=0 ? 'Green' : 'rgb(210, 0, 0)';
     

    return (
        <List style={{background: `${color}`, color: '#fff'}}>
            <Deleteiicon>
                <DeleteIcon onClick={() => deleteTransaction(transaction.id)} />
            </Deleteiicon>
            <ListItemText primary={transaction.text} />
            <ListItemText primary={amount} />
        </List>
    )
}

export default Transaction;