import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillCaretLeft, AiFillHome } from "react-icons/ai";
import { TbChartPieFilled } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  const router = useRouter();
  const routePath = router.asPath;
  const [pageSelectArrow, setPageSelectArrow] = useState(true);

  return (
    <div className="flex">
      <div className={styles.sidebarDiv}>
        <div className={styles.itemsDiv}>
          <div className={styles.itemLogoDiv}>
            <Link href="/">
              <Image
                src="/white_logo_color1_background.png"
                alt="logo"
                width={75}
                height={45}
              />
            </Link>
          </div>
          <div className={styles.itemDiv} 
            onMouseOver={() => setPageSelectArrow(false)} 
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/dashboard" className={styles.link}>
              <MdSpaceDashboard className={styles.icon} />
            </Link>
            <AiFillCaretLeft 
              className={ !routePath.includes("/dashboard") ? styles.selectArrow : pageSelectArrow ? styles.selectArrowSelected : styles.selectArrow } 
            />
          </div>
          <div className={styles.itemDiv} 
            onMouseOver={() => setPageSelectArrow(false)} 
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/home" className={styles.link}>
              <AiFillHome className={styles.icon} />
            </Link>
            <AiFillCaretLeft 
              className={ !routePath.includes("/home") ? styles.selectArrow : pageSelectArrow ? styles.selectArrowSelected : styles.selectArrow } 
            />
          </div>
          <div className={styles.itemDiv} 
            onMouseOver={() => setPageSelectArrow(false)} 
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/report" className={styles.link}>
              <TbChartPieFilled className={styles.icon} />
            </Link>
            <AiFillCaretLeft 
              className={ !routePath.includes("/report") ? styles.selectArrow : pageSelectArrow ? styles.selectArrowSelected : styles.selectArrow } 
            />
          </div>
          <div className={styles.itemDiv} 
            onMouseOver={() => setPageSelectArrow(false)} 
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/chat" className={styles.link}>
              <AiFillMessage className={styles.icon} />
            </Link>
            <AiFillCaretLeft 
              className={ !routePath.includes("/chat") ? styles.selectArrow : pageSelectArrow ? styles.selectArrowSelected : styles.selectArrow } 
            />
          </div>
        </div>


        {/* Logout button */}
        <div className={styles.logoutBtn}>
          <IoLogOut className={styles.icon} />
        </div>
        
      </div>

      
    </div>
  );
};

export default Sidebar;
