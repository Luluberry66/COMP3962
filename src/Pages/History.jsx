import React, { useContext } from 'react'
import './CSS/MyAccount.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserInfoContext } from '../Context/LoggedIn'

const History = () => {
  const { setIsLoggedIn } = useContext(UserInfoContext);
  const navigate = useNavigate();
  
  // Dummy data for transaction history with added date property
  const transactions = [
    { id: 1, orderNumber: '10001', item: 'Cumulus Cloud', price: '$20.00', date: '2024-04-01' },
    { id: 2, orderNumber: '10002', item: 'Stratus Cloud', price: '$15.00', date: '2024-04-01' },
    { id: 3, orderNumber: '10003', item: 'Cirrus Cloud', price: '$25.00', date: '2024-04-02' }
  ];

  // Function to group transactions by date
  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className='loginsignup'>
     <div className="loginsignup-container">
        <div className="navigation-tabs">
          <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            Account Settings
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            Transaction History
          </NavLink>
        </div>

        <h1>Transaction History</h1>
        <div className="transaction-history">
          {Object.keys(groupedTransactions).map((date) => (
            <div key={date} className="transaction-date-group">
              <h2>{date}</h2>
              {groupedTransactions[date].map((transaction) => (
                <div key={transaction.id} className="transaction">
                  <span>Order #{transaction.orderNumber}</span>
                  <span>{transaction.item}</span>
                  <span>{transaction.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;