import React, { useState, useEffect } from 'react'
import styles from './Admin.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoader(true)
        const response = await axios.get('/api/resume/get');
        setData(response.data.data);
        setLoader(false)
      } catch (err) {
        console.log(err);
        setLoader(false)
      }
    }
    fetchAllData()
  }, [])

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>
        {
          loader && <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
          </>
        }
        {
          !loader && data.map((item, index) => {
            return (
              <div key={item._id} className={styles.AdminCard}>
                <img src={item.user?.photoUrl} alt="user" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                <h3>{item.user?.name}</h3>
                <p>{item.user?.email}</p>
                <div className={styles.cardPercentage}>{item.score}%</div>
                <p>Resume Name: {item.resume_name}</p>
                <p>{item.feedback}</p>
                <p>Dated: {item.createdAt?.slice(0, 10)}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default WithAuthHOC(Admin);