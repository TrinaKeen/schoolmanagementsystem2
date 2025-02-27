<header className={styles.header}>
        <Link href={"/"}>
          <div className={styles.logo}>
            <Image src={logo} alt="School Logo" width={100} height={100} />
            <h1>EEFCI Management System</h1>
          </div>
        </Link>

        <nav className={styles.navbar}>
          <Link href="../AdminPortal/admin-dashboard">
            <FaHome size={35} />
          </Link>

          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("notifications")}
            >
              <FaBell size={35} />
            </button>

            {isDropdownOpen === "notifications" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">
                  No new notifications
                </p>
              </div>
            )}
          </div>
          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("messages")}
            >
              <FaEnvelope size={35} />
            </button>

            {isDropdownOpen === "messages" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">
                  No new messages
                </p>
              </div>
            )}
          </div>

          <div className={styles.loginDropdown}>
            {/* Button to toggle dropdown */}
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("account")} // Toggle dropdown on button click
            >
              <FaBars size={35} />
            </button>

            {/* Conditionally render the dropdown based on state */}
            {isDropdownOpen === "account" && (
              <div className={styles.dropdownContent}>
                <Link href="/">Log Out</Link>
                <Link href="../AdminPortal/admin-settings">
                  Account Settings
                </Link>
                <Link href="#">Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>