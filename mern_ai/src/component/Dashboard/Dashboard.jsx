
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState } from 'react';
import axios from '../../utils/axios';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
    const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);
    const { userInfo } = useContext(AuthContext);

    const handleOnChangeFile = (e) => {
        setResumeFile(e.target.files[0]);
        setUploadFileText(e.target.files[0].name)
    }

    const handleUpload = async () => {
        try {
            if (!resumeFile) {
                alert("Please upload your resume first");
                return;
            }
            if (!jobDesc) {
                alert("Please paste the job description");
                return;
            }

            setLoading(true);
            setResult(null);

            const formData = new FormData();
            formData.append("resume", resumeFile);
            formData.append("job_desc", jobDesc);
            formData.append("user", userInfo?._id);

            const response = await axios.post('/api/resume/addResume', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setResult(response.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("Something went wrong while analyzing");
            setLoading(false);
        }
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.DashboardLeft}>
                <div className={styles.DashboardHeader}>
                    <h2>Welcome, {userInfo?.name}</h2>
                </div>
                <div className={styles.alertInfo}>
                    Upload your resume in PDF format and paste the job description to get an AI powered match score.
                </div>
                <div className={styles.DashboardUploadResume}>
                    <label htmlFor="resumeUpload" className={styles.uploadLabel}>
                        {uploadFiletext}
                    </label>
                    <input
                        id="resumeUpload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleOnChangeFile}
                        style={{ display: "none" }}
                    />
                </div>
                <div className={styles.jobDesc}>
                    <textarea value={jobDesc} onChange={(e) => { setJobDesc(e.target.value) }} className={styles.textArea} placeholder='Paste Your Job Description' rows={10} cols={50} />
                    <div className={styles.AnalyzeBtn} onClick={handleUpload}>Analyze</div>
                </div>
            </div>
            <div className={styles.DashboardRight}>
                <div className={styles.DashboardRightTopCard}>
                    <div>Analyze With AI</div>
                    <img className={styles.profileImg} src={userInfo?.photoUrl} />
                    <h2>{userInfo?.name}</h2>
                </div>
                {
                    result && <div className={styles.DashboardRightTopCard}>
                        <div>Result</div>
                        <h3>Score: {result.score}</h3>
                        <p>{result.feedback}</p>
                    </div>
                }
                {
                    loading && <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
                }
            </div>
        </div>
    )
}

export default WithAuthHOC(Dashboard)