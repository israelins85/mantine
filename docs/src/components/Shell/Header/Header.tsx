import React from 'react';
import cx from 'clsx';
import { IconChevronDown, IconExternalLink } from '@tabler/icons-react';
import { Code, Group, Burger, RemoveScroll, Menu, UnstyledButton, Text, Box } from '@mantine/core';
import { HeaderControls, ColorSchemeControl, SearchMobileControl } from '@mantinex/mantine-header';
import { meta, majorVersions } from '@mantinex/mantine-meta';
import packageJson from '../../../../../package.json';
import { Logo } from '@/components/Logo';
import { searchHandlers } from '@/components/Search';
import classes from './Header.module.css';

export type HeaderControlsProps = Partial<React.ComponentProps<typeof HeaderControls>>;

interface HeaderProps {
  navbarOpened: boolean;
  onNavbarToggle: () => void;
  headerControlsProps?: HeaderControlsProps;
}

export function Header({ navbarOpened, onNavbarToggle, headerControlsProps }: HeaderProps) {
  const versionItems = majorVersions.map((item) => (
    <Menu.Item
      key={item.name}
      component="a"
      href={item.link}
      target="_blank"
      rightSection={<IconExternalLink className={classes.versionExternalIcon} stroke={1.5} />}
    >
      <b>{item.v}</b>{' '}
      <Text span c="dimmed" fz="xs">
        ({item.name})
      </Text>
    </Menu.Item>
  ));

  return (
    <>
      <header className={cx(classes.header, RemoveScroll.classNames.fullWidth)} data-desktop>
        <div className={classes.logo}>
          <Logo />
          <Menu width={180}>
            <Menu.Target>
              <UnstyledButton>
                <Code fw="bold" className={classes.version}>
                  <span>{packageJson.version}</span>
                  <IconChevronDown className={classes.versionChevron} stroke={1.5} />
                </Code>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>{versionItems}</Menu.Dropdown>
          </Menu>
        </div>

        <HeaderControls
          className={classes.controls}
          onSearch={searchHandlers.open}
          githubLink="https://github.com/mantinedev/mantine"
          discordLink={meta.discordLink}
          {...headerControlsProps}
        />
      </header>

      <header className={cx(classes.header, RemoveScroll.classNames.fullWidth)} data-mobile>
        <Group justify="space-between" w="100%" wrap="nowrap">
          <Box miw={80}>
            <Burger
              opened={navbarOpened}
              onClick={onNavbarToggle}
              size="sm"
              aria-label="Toggle navbar"
            />
          </Box>

          <Logo />

          <Group gap="sm">
            <SearchMobileControl onSearch={searchHandlers.open} />
            <ColorSchemeControl />
          </Group>
        </Group>
      </header>
    </>
  );
}