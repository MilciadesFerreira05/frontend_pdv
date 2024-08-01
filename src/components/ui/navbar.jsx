
const Navbar = () => {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
                <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                  <PackageIcon className="h-4 w-4" />
                  Products
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <ClipboardIcon className="h-4 w-4" />
                  Orders
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <UsersIcon className="h-4 w-4" />
                  Customers
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
        </nav>
    )
}

export default Navbar;