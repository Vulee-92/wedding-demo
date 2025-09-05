// "use client"

// import { useState, useRef, useCallback, useEffect } from "react"
// import {
//   Box,
//   Button,
//   IconButton,
//   Typography,
//   Fab,
//   Fade,
//   CircularProgress,
//   Paper,
//   Grid,
//   Toolbar
// } from "@mui/material"
// import {
//   CameraAlt as CameraIcon,
//   FlipCameraIos as SwitchCameraIcon,
//   Close as CloseIcon,
//   Timer as TimerIcon,
//   AutoAwesomeMosaic as CollageIcon,
//   Check as CheckIcon,
//   Delete as DeleteIcon,
//   Download as DownloadIcon
// } from "@mui/icons-material"

// export default function CameraInterface() {
//   const videoRef = useRef<HTMLVideoElement | null>(null)
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const [stream, setStream] = useState<MediaStream | null>(null)
//   const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [zoomLevel, setZoomLevel] = useState<number>(1)
//   const [countdown, setCountdown] = useState<number | null>(null)
//   const [isCountingDown, setIsCountingDown] = useState(false)
//   const [showCountdownOptions, setShowCountdownOptions] = useState(false)
//   const [collageMode, setCollageMode] = useState<"2" | "4" | null>(null)
//   const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
//   const [showCollageOptions, setShowCollageOptions] = useState(false)
//   const [activeCellIndex, setActiveCellIndex] = useState(0)
//   const [capturedPhotoDataUrl, setCapturedPhotoDataUrl] = useState<string | null>(null)

//   const startCamera = useCallback(async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop())
//       }
//       const newStream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode,
//           width: { ideal: 1920 },
//           height: { ideal: 1080 },
//         },
//       })
//       if (videoRef.current) {
//         videoRef.current.srcObject = newStream
//         setStream(newStream)
//         videoRef.current.onloadedmetadata = () => {
//           setIsLoading(false)
//         }
//       }
//     } catch (err) {
//       console.error("Camera error:", err)
//       setError("Camera access denied. Please allow camera permissions in your browser settings.")
//       setIsLoading(false)
//     }
//   }, [facingMode, stream])

//   useEffect(() => {
//     startCamera()
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop())
//       }
//     }
//   }, [facingMode, startCamera])

//   const switchCamera = () => {
//     setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
//   }

//   const createCollage = async (photos: string[]) => {
//     const canvas = canvasRef.current
//     if (!canvas || photos.length === 0) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return
//     const loadedImages = await Promise.all(
//       photos.map(
//         (photo) =>
//           new Promise<HTMLImageElement>((resolve) => {
//             const img = new Image()
//             img.onload = () => resolve(img)
//             img.src = photo
//           })
//       )
//     )
//     const photoWidth = loadedImages[0].width
//     const photoHeight = loadedImages[0].height
//     let canvasWidth, canvasHeight, positions
//     if (collageMode === "2") {
//       canvasWidth = photoWidth * 2
//       canvasHeight = photoHeight
//       positions = [{ x: 0, y: 0 }, { x: photoWidth, y: 0 }]
//     } else {
//       canvasWidth = photoWidth * 2
//       canvasHeight = photoHeight * 2
//       positions = [{ x: 0, y: 0 }, { x: photoWidth, y: 0 }, { x: 0, y: photoHeight }, { x: photoWidth, y: photoHeight }]
//     }
//     canvas.width = canvasWidth
//     canvas.height = canvasHeight
//     ctx.fillStyle = "white"
//     ctx.fillRect(0, 0, canvasWidth, canvasHeight)
//     loadedImages.forEach((img, index) => {
//       const pos = positions[index]
//       ctx.drawImage(img, pos.x, pos.y, photoWidth, photoHeight)
//     })
//     const collageDataUrl = canvas.toDataURL("image/jpeg", 0.9)
//     setCapturedPhotoDataUrl(collageDataUrl) // Cập nhật state ảnh đã chụp
//     setCollageMode(null)
//     setCapturedPhotos([])
//     setActiveCellIndex(0)
//   }

//   const capturePhoto = useCallback(async () => {
//     if (!videoRef.current || !canvasRef.current) return
//     const video = videoRef.current
//     const canvas = canvasRef.current
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return
//     const originalWidth = video.videoWidth
//     const originalHeight = video.videoHeight
//     const zoomedWidth = originalWidth / zoomLevel
//     const zoomedHeight = originalHeight / zoomLevel
//     canvas.width = originalWidth
//     canvas.height = originalHeight
//     const cropX = (originalWidth - zoomedWidth) / 2
//     const cropY = (originalHeight - zoomedHeight) / 2
//     ctx.save()
//     if (facingMode === "user") {
//       ctx.scale(-1, 1)
//       ctx.drawImage(video, cropX, cropY, zoomedWidth, zoomedHeight, -originalWidth, 0, originalWidth, originalHeight)
//     } else {
//       ctx.drawImage(video, cropX, cropY, zoomedWidth, zoomedHeight, 0, 0, originalWidth, originalHeight)
//     }
//     ctx.restore()
//     const photoDataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9)
//     if (collageMode) {
//       const updatedPhotos = [...capturedPhotos, photoDataUrl]
//       setCapturedPhotos(updatedPhotos)
//       setActiveCellIndex((prev) => prev + 1)
//       if (updatedPhotos.length === parseInt(collageMode)) {
//         await createCollage(updatedPhotos)
//       }
//     } else {
//       setCapturedPhotoDataUrl(photoDataUrl) // Cập nhật state ảnh đã chụp
//     }
//   }, [collageMode, capturedPhotos, zoomLevel, facingMode, createCollage])

//   const handleZoom = (event: Event, newValue: number | number[]) => {
//     setZoomLevel(newValue as number)
//     if (videoRef.current) {
//       const transform = facingMode === "user" ? `scaleX(-1) scale(${newValue})` : `scale(${newValue})`
//       videoRef.current.style.transform = transform
//       videoRef.current.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//     }
//   }

//   const startCountdown = (seconds: number) => {
//     setCountdown(seconds)
//     setIsCountingDown(true)
//     setShowCountdownOptions(false)
//     const countdownInterval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev === null || prev <= 1) {
//           clearInterval(countdownInterval)
//           setIsCountingDown(false)
//           setCountdown(null)
//           setTimeout(() => capturePhoto(), 100)
//           return null
//         }
//         return prev - 1
//       })
//     }, 1000)
//   }

//   const resetCollageMode = () => {
//     setCollageMode(null)
//     setCapturedPhotos([])
//     setActiveCellIndex(0)
//   }

//   const resetCamera = () => {
//     setCapturedPhotoDataUrl(null);
//     resetCollageMode();
//     startCamera();
//   };

//   const handleDownload = () => {
//     if (capturedPhotoDataUrl) {
//       const link = document.createElement("a");
//       link.href = capturedPhotoDataUrl;
//       link.download = `photo-${Date.now()}.jpeg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   // --- GIAO DIỆN HIỂN THỊ ẢNH ĐÃ CHỤP ---
//   if (capturedPhotoDataUrl) {
//     return (
//       <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", bgcolor: "black", overflow: "hidden" }}>
//         <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <Box component="img" src={capturedPhotoDataUrl} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
//         </Box>
//         <Toolbar sx={{ bgcolor: "black", display: "flex", justifyContent: "space-around", p: 2, borderTop: "1px solid #333" }}>
//           <Button variant="outlined" startIcon={<CloseIcon />} onClick={resetCamera} sx={{ color: "white", borderColor: "white" }}>
//             Chụp lại
//           </Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ bgcolor: "white", color: "black", "&:hover": { bgcolor: "lightgray" } }}>
//             Tải về
//           </Button>
//         </Toolbar>
//       </Box>
//     );
//   }

//   // --- GIAO DIỆN CAMERA CHỤP ẢNH ---
//   return (
//     <Box sx={{
//       width: "100%",
//       height: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       bgcolor: "black",
//       overflow: "hidden",
//       position: "relative"
//     }}>
//       <Box sx={{
//         flexGrow: 1,
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         borderBottomLeftRadius: "2rem",
//         borderBottomRightRadius: "2rem"
//       }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             transform: facingMode === "user" ? `scaleX(-1) scale(${zoomLevel})` : `scale(${zoomLevel})`,
//             transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         />

//         <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 40 }}>
//           <IconButton onClick={() => {}} sx={{ color: "white", p: 1.5, "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 40, display: "flex", flexDirection: "column", gap: 2 }}>
//           {!collageMode && (
//             <Box sx={{ position: "relative" }}>
//               <IconButton
//                 onClick={() => setShowCountdownOptions(!showCountdownOptions)}
//                 disabled={isCountingDown}
//                 sx={{ bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
//               >
//                 <TimerIcon />
//               </IconButton>
//               <Fade in={showCountdownOptions}>
//                 <Paper
//                   sx={{
//                     position: "absolute",
//                     top: "50%",
//                     right: "calc(100% + 8px)",
//                     transform: "translateY(-50%)",
//                     bgcolor: "rgba(0,0,0,0.8)",
//                     backdropFilter: "blur(8px)",
//                     p: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 1
//                 }}
//                 >
//                   <Button onClick={() => startCountdown(3)} sx={{ color: "white" }}>3s</Button>
//                   <Button onClick={() => startCountdown(5)} sx={{ color: "white" }}>5s</Button>
//                   <Button onClick={() => startCountdown(10)} sx={{ color: "white" }}>10s</Button>
//                 </Paper>
//               </Fade>
//             </Box>
//           )}
//           <IconButton onClick={switchCamera} sx={{ bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>
//             <SwitchCameraIcon />
//           </IconButton>
//           <Box sx={{ position: "relative" }}>
//             <IconButton
//               onClick={() => {
//                 setShowCollageOptions(!showCollageOptions)
//                 if (collageMode) {
//                   resetCollageMode()
//                 }
//               }}
//               sx={{ bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
//             >
//               <CollageIcon />
//             </IconButton>
//             <Fade in={showCollageOptions}>
//               <Paper
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   right: "calc(100% + 8px)",
//                   transform: "translateY(-50%)",
//                   bgcolor: "rgba(0,0,0,0.8)",
//                   backdropFilter: "blur(8px)",
//                   p: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1
//                 }}
//               >
//                 <Button onClick={() => { setCollageMode("4"); setCapturedPhotos([]); setShowCollageOptions(false); }} sx={{ color: "white" }}>4 ảnh</Button>
//               </Paper>
//             </Fade>
//           </Box>
//         </Box>
//         {collageMode && (
//           <Grid container sx={{ position: "absolute", inset: 0, zIndex: 30, p: 1, gap: 1 }}>
//             {Array.from({ length: parseInt(collageMode) }).map((_, index) => (
//               <Grid
//                 key={index}
//                 item
//                 xs={6}
//                 sx={{
//                   position: "relative",
//                   overflow: "hidden",
//                   borderRadius: "1.5rem",
//                   border: index === activeCellIndex ? "2px solid white" : "2px solid rgba(255,255,255,0.1)",
//                   p: 0,
//                 }}
//               >
//                 {capturedPhotos[index] && (
//                   <Box component="img" src={capturedPhotos[index]} alt={`Ảnh đã chụp ${index + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 )}
//               
//                 <Typography variant="h4" sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>
//                   {index + 1}
//                 </Typography>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//         {countdown !== null && (
//           <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
//             <Typography variant="h1" sx={{ color: "white", fontSize: "6rem", fontWeight: "bold", animation: "pulse 1s infinite" }}>
//               {countdown}
//             </Typography>
//           </Box>
//         )}
//         {!collageMode && (
//           <Box sx={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 30, bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", borderRadius: "1.5rem", p: 1, display: "flex", gap: 1 }}>
//             <Button variant={zoomLevel === 1 ? "contained" : "text"} onClick={() => handleZoom({} as Event, 1)} sx={{ color: zoomLevel === 1 ? "black" : "white", bgcolor: zoomLevel === 1 ? "white" : "transparent", borderRadius: "1rem" }}>1x</Button>
//             <Button variant={zoomLevel === 2 ? "contained" : "text"} onClick={() => handleZoom({} as Event, 2)} sx={{ color: zoomLevel === 2 ? "black" : "white", bgcolor: zoomLevel === 2 ? "white" : "transparent", borderRadius: "1rem" }}>2x</Button>
//             <Button variant={zoomLevel === 3 ? "contained" : "text"} onClick={() => handleZoom({} as Event, 3)} sx={{ color: zoomLevel === 3 ? "black" : "white", bgcolor: zoomLevel === 3 ? "white" : "transparent", borderRadius: "1rem" }}>3x</Button>
//           </Box>
//         )}
//       </Box>

//       <Box sx={{ flexShrink: 0, height: 120, bgcolor: "black", display: "flex", alignItems: "center", justifyContent: "space-around", px: 2, pb: 4, zIndex: 30 }}>
//         <IconButton onClick={() => {}} sx={{ color: "white" }}>
//           <CloseIcon sx={{ fontSize: 32 }} />
//         </IconButton>
//         <Fab
//           color="primary"
//           onClick={capturePhoto}
//           disabled={isCountingDown}
//           sx={{
//             width: 80,
//             height: 80,
//             bgcolor: "white",
//             border: "4px solid #FFD700",
//             "&:hover": { bgcolor: "white" },
//             position: "relative"
//           }}
//         >
//           <CameraIcon sx={{ color: "#FFD700" }} />
//         </Fab>
//         <IconButton onClick={switchCamera} sx={{ color: "white" }}>
//           <SwitchCameraIcon sx={{ fontSize: 32 }} />
//         </IconButton>
//       </Box>
//      
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {isLoading && (
//         <Box sx={{ position: "absolute", inset: 0, bgcolor: "black", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
//           <CircularProgress sx={{ color: "white" }} />
//           <Typography variant="body1" sx={{ color: "white", ml: 2 }}>
//             Đang khởi động camera...
//           </Typography>
//         </Box>
//       )}
//       {error && (
//         <Box sx={{ position: "absolute", inset: 0, bgcolor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4, zIndex: 50 }}>
//           <CameraIcon sx={{ fontSize: 64, mb: 2 }} />
//           <Typography variant="h6" align="center" mb={2}>
//             {error}
//           </Typography>
//           <Button variant="contained" onClick={startCamera}>
//             Thử lại
//           </Button>
//         </Box>
//       )}
//     </Box>
//   )
// }