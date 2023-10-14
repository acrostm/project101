import React, { useState, useEffect } from 'react';
import styles from '../../styles/FrontPage.module.scss';
import RealTimeClock from "../functions/RealTime";
import { motion } from "framer-motion";


function FrontPage() {


    return(
        <div className={styles.app}>
            <div className={styles.head}>
                <div className={styles.time}>
                    <RealTimeClock/>
                </div>
            </div>
            <div className={styles.container}>
                <h1>Discipline</h1>
                <h2>No other coins!</h2>
                <h1>Workout Everyday</h1>
                <h1>Getup immediately</h1>
                <h1 className={styles.x}>X Control</h1>
            </div>
            <div className={styles.left}>
                <motion.div
                    className={styles.box}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    ToDo
                </motion.div>
            </div>

        </div>
    );
}

export default FrontPage;
