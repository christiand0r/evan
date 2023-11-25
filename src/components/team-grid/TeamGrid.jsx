'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TeamGrid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
//import { useSpring, animated } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";

const GridTeam = (props) => {

    const { initialItems, titleSection, members, hostCms } = props;

    const initItems = initialItems ? initialItems : 7;
    const [visibleItems, setVisibleItems] = useState(initItems);

    const teamData = members;

    const showMoreItems = () => {
        setVisibleItems((prevValue) => prevValue + 4);
    };

    const showLessItems = () => {
        const totalItems = teamData.length + 1;
        setVisibleItems((prevValue) => + prevValue - (totalItems - initItems));
    }

    return (
        <section className={`${styles.gridTeams} grid-teams mb-xxl`}>
            {titleSection && <h2 className="text-center display-large color-01 secondary-font">{titleSection}</h2>}
            <div className={styles.gridTeam}>
                <AnimatePresence>
                    {teamData.map((item, index) => (
                        index < visibleItems && (
                            <motion.article
                                key={index}
                                initial={index >= initItems ? { opacity: 0, height: 0, translateY: -100 } : {}}
                                animate={{ opacity: 1, height: '400px', translateY: 0 }}
                                exit={{ opacity: 0, height: 0, translateY: -100 }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.gridTeam__item}`}
                            >
                                <figure className={styles.gridTeam__item__figure}>
                                    <Image
                                        src={hostCms + item.image_member.data.attributes.url}
                                        alt={item.title_member}
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                </figure>
                                <div className="grid-team__item__details">
                                    <h4>{item.title_member}</h4>
                                    <div className={styles.gridTeam__item__foot}>
                                        <p>{item.speciality_memeber}</p>
                                        <Link
                                            target="_blank"
                                            href={item.linkedin_member ?? '#'}
                                        >
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {teamData.length > initItems && (
                <div className="container buttonContent d-flex justify-content-center mt-xl">
                    <button id="showMore" type="button" onClick={visibleItems < teamData.length ? showMoreItems : showLessItems} className="evanhub-btn btn-outline__primary mx-w-fit">
                        {visibleItems < teamData.length ? 'Conocer más profesionales' : 'Ver menos profesionales'}
                        <i className={`bi ${visibleItems < teamData.length ? 'bi-chevron-down' : 'bi-chevron-up'}`} ></i>
                    </button>
                </div>
            )}

        </section>
    )
}

export default GridTeam;