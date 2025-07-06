import { useSettings } from "@/context"
import { useMemo } from "react"

const useTokenValidation = () => {
    const {settings} = useSettings()

    const isValidToken = useMemo(() => {
        return settings.token &&
        settings.token !== 'default token' && 
        settings.token !== "" &&
        /^[a-zA-Z0-9~]+$/.test(settings.token)
    }, [settings.token])

    return {useTokenValidation}
}