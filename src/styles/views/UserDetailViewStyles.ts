// src/styles/views/UserDetailViewStyles.ts

import { StyleSheet } from 'react-native';

const COLORS = {
    GREEN_ACCENT: '#E8F5E9',   
    GREEN_DARK: '#00A859',     
    TEXT_MAIN: '#333333',      
    TEXT_LABEL: '#888888',     
    CARD_BACKGROUND: '#FFFFFF',
    CHECK_COLOR: '#00A859',
};

export const UserDetailViewStyles = StyleSheet.create({
    scrollContainer: {
     
        flexGrow: 1, 
    
        justifyContent: 'center', 
        paddingTop: 10, 
        paddingBottom: 20, 
        paddingHorizontal: 15,
        backgroundColor: COLORS.GREEN_ACCENT,
         borderRadius: 20,
    },
    header: {
        flexDirection: 'row',
       
        alignItems: 'center',
        paddingBottom: 20,
        justifyContent: 'center', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
    },
    
    
    avatarContainer: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 15,
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderWidth: 2,
        borderColor: COLORS.GREEN_DARK,
        elevation: 5,
        marginBottom: 35,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    card: {
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
       
    },
    fieldContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 5,
    },
    label: {
        fontSize: 12,
        color: COLORS.TEXT_LABEL,
        marginBottom: 2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldIcon: {
        marginRight: 8,
        color: COLORS.TEXT_MAIN, 
    },
    inputValue: {
        flex: 1,
        fontSize: 16,
        color: COLORS.TEXT_MAIN,
        fontWeight: '500',
    },
    checkIcon: {
        marginLeft: 8,
        color: COLORS.CHECK_COLOR,
    }
});