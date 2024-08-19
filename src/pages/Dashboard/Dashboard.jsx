import React, { useEffect , useState } from 'react'; // Import useEffect from React
import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const handleAuthTokens = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const token = urlParams.get('token');
  const refreshToken = urlParams.get('refreshToken');
  
  if (id) {
    sessionStorage.setItem('userId', id);
  }

  if (token) {
    sessionStorage.setItem('authToken', token);
  }

  if (refreshToken) {
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=2592000;`;
  }

  // Xóa token và refreshToken từ query string sau khi lưu trữ
  window.history.replaceState({}, document.title, window.location.pathname);
};

const handleRefreshToken = async () => {
  try {
    // Lấy refreshToken từ cookie
    const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (!refreshToken) {
      console.error('No refresh token found');
      window.location.href = '/login';
      return;
    }

    // Gửi yêu cầu làm mới token đến server
    const response = await axios.post(
      'http://localhost:3001/api/v1/auth/refresh',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = response.data;
    if (data.accessToken) {
      sessionStorage.setItem('authToken', data.accessToken);
    } else {
      console.error('No access token returned');
    }
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
  }
};


const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  const handleGetDataUser = async () => {
    try {
      const id = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3001/api/v1/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      if(error.response.status === 401) {
        handleRefreshToken();
      } else {
        toast.error('Error get data');
      }
    }
  }

  useEffect(() => {
    handleAuthTokens();
    handleGetDataUser();
    const interval = setInterval(() => {
      handleRefreshToken(); // Refresh token periodically
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, []);

  const handlerLogout = async () => {
    try {
      sessionStorage.removeItem('authToken');
      document.cookie = 'refreshToken=; path=/; max-age=0;';
      window.location.href = '/login';
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      {userData && (
        <table className='user-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.id}</td>
              <td>{userData.displayName}</td>
              <td>{userData.email}</td>
              {/* Add more data as needed */}
            </tr>
          </tbody>
        </table>
      )}
      <button onClick={handlerLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;