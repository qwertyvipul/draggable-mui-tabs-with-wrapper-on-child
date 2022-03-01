import { MoreHoriz } from '@mui/icons-material';
import { ButtonBase, Divider, Menu, MenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { TabsContext } from './TabsContext';

const TabDropdownRoot = styled(ButtonBase, {
    overridesResolver: (_, styles) => [styles.scrollButton],
})(({ theme }) => {
    return {
        flexShrink: 0,
        padding: 0,
        flexDirection: 'column',
        color: theme.palette.primary.main,
    };
});

export const TabDropdown = (props) => {
    const tabsContext = useContext(TabsContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMoreClick = (event) => setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleTabSelect = (e) => {
        tabsContext.onChange?.(e, tabsContext.tabs[e.target.value].props.value);
        setAnchorEl(null);
    };

    if (props.direction === 'left') {
        return null;
    }

    return (
        <>
            <TabDropdownRoot
                onClick={handleMoreClick}
                className="MuiTabs-scrollButton"
            >
                <Stack direction="row">
                    <Divider orientation="vertical" />
                    <MoreHoriz />
                </Stack>
            </TabDropdownRoot>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {tabsContext.tabs.map((tab, index) => {
                    return (
                        <MenuItem
                            key={index}
                            value={index}
                            onClick={handleTabSelect}
                        >
                            {tab.label}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default TabDropdown;
