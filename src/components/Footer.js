import React, { } from 'react';
import { Layout } from "antd";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Theme } from '../utils/constants';
const { Footer } = Layout

export default function FooterBar ({ children, classes, style }) {
    const { themeColor } = useSelector( ({User}) => User );

    return (
        <Footer className={classNames('w-full flex items-center justify-center text-center', classes)} style={{background: Theme.dark_color,color:"white", borderTop: '1px solid black', ...style}}>
            {children}
        </Footer>
    )
}