'use client'

import { Button } from "@/components/helpers/mt-exporter";

const CallToActionButton = () => {
  function handleClick() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return <Button
    variant="outlined"
    color="white"
    className="mt-8"
    size="lg"
    onClick={handleClick}
  >
    Veja o catálogo
  </Button>
}

CallToActionButton.displayName = 'CallToActionButton'

export default CallToActionButton
