'use client';

import React, { useState } from 'react'
import NavbarLight from 'components/navbar/owner-navbar'
import { MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import Select from 'react-select';
import FooterTop from 'components/footer-top'
import Footer from 'components/footer'
import BackToTop from 'components/back-to-top'

const options = [
    { value: '1', label: 'Eat & Drinking' },
    { value: '2', label: 'Rental Property' },
    { value: '3', label: 'Classifieds' },
    { value: '4', label: 'Bank Services' },
    { value: '5', label: 'Shopping' },
    { value: '6', label: 'Fintess & Gym' },
    { value: '7', label: 'Coaching' },
    { value: '8', label: 'Other Services' },
];

export default function Elements() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        console.log(selected.map(option => option.value));
    };

    return (
        <>
            <NavbarLight />
            <section className="bg-light">
                <div className="container">
                    {/* ... content ... */}
                </div>
            </section>

            <FooterTop />
            <Footer />
            <BackToTop />
        </>
    )
}
