declare module "react-contextmenu" {
    interface ContextMenuProps {
        id: string,
        className?: string,
        hideOnLeave?: boolean,
        data?: any,
        onHide?: (args: any) => void,
        onMouseLeave?: (args: any) => void,
        onShow?: (args: any) => void,
    }

    interface ContextMenuTriggerProps {
        id: string,
        name?: string,
        attributes?: any,
        collect?: (args: any) => void,
        disable?: boolean,
        holdToDisplay?: number,
        renderTag?: any,
    }

    interface MenuItemProps {
        attributes?: any,
        data?: Object,
        disabled?: boolean,
        preventClose?: boolean,
        divider?: boolean,
        onClick?: (...args: any[]) => void,
    }

    module ReactContextmenu {
        export const ContextMenu: React.SFC<ContextMenuProps>;
        export const ContextMenuTrigger: React.SFC<ContextMenuTriggerProps>;
        export const MenuItem: React.SFC<MenuItemProps>;
    }

    export = ReactContextmenu;
}
