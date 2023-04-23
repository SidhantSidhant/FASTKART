export interface Ifastkartrole {
    current_page: number
    data: Idata[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Ilink[]
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
  
  export interface Idata {
    id: string 
    name: string
    guard_name: string
    system_reserve: string
    created_at: string
    updated_at: string
    permissions: Ipermission[]
  }
  
  export interface Ipermission {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    pivot: Irole
  }
  
  export interface Irole {
    role_id: string
    permission_id: string
  }
  
  export interface Ilink {
    url?: string
    label: string
    active: boolean
  }
  



  export interface Ilogin {
    access_token: string
    permissions ?: Permission[]
    success: boolean
  }
  
  export interface Permission {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    pivot: Irole
  }
  
  export interface Irole {
    role_id: string
    permission_id: string
  }
  