/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Link,
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
} from '@backstage/core-components';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import BuildIcon from '@material-ui/icons/Build';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { NavContentBlueprint } from '@backstage/plugin-app-react';
import { SidebarSearchModal } from '@backstage/plugin-search';
import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
import {
  Settings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { makeStyles } from '@material-ui/core/styles';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? (
          <span style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#7df3e1',
            letterSpacing: '-1px',
            fontFamily: 'Roboto, sans-serif'
          }}>
            IVAN<span style={{ color: '#fff' }}>DEV</span>
          </span>
        ) : (
          <span style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#7df3e1',
            fontFamily: 'Roboto, sans-serif'
          }}>
            I
          </span>
        )}
      </Link>
    </div>
  );
};

export const appModuleNav = createFrontendModule({
  pluginId: 'app',
  extensions: [
    NavContentBlueprint.make({
      params: {
        component: ({ items }) => (
          <Sidebar>
            <SidebarLogo />
            <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
              <SidebarSearchModal />
            </SidebarGroup>
            <SidebarDivider />
            <SidebarGroup label="Menu" icon={<MenuIcon />}>
              <SidebarScrollWrapper>
                {items.map((item, index) => (
                  <SidebarItem {...item} key={index} />
                ))}
              </SidebarScrollWrapper>
            </SidebarGroup>
            <SidebarDivider />
            <SidebarSpace />
            <SidebarDivider />
            <SidebarGroup
              label="Settings"
              icon={<UserSettingsSignInAvatar />}
              to="/settings"
            >
              <NotificationsSidebarItem />
              <SidebarItem icon={BuildIcon} to="devtools" text="DevTools" />
              <Settings />
            </SidebarGroup>
          </Sidebar>
        ),
      },
    }),
  ],
});
