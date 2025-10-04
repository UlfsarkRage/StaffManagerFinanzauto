// src/styles/views/AppHeaderStyles.ts

import { StyleSheet } from 'react-native';

export const AppHeaderStyles = StyleSheet.create({
    header: {
        height: 90,
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#176D6C', 
        fontSize: 50,
        fontWeight: 'bold',
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        padding: 15,
    },
    subNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#176D6C', 
        height: 60,
        paddingHorizontal: 35,
    },
    subNavTitle: {
        fontSize: 20,
        color: '#A2D02F', 
        fontWeight: '500',
    },
    menuIcon: {
        fontSize: 24,
        color: 'white',
    },
});