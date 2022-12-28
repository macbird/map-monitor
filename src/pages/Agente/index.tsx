import {FaEdit, FaTrashAlt} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import "./Agent.css"
import {AnimatePresence, motion} from "framer-motion";
import {useApp} from "../../context/AppProvider/useApp"
import noAvatar from "../../assets/noAvatar.svg"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from "react-hook-form";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from "@mui/material";
import {GET, PUT, POST, DELETE} from "../../service/api";
import masks from "../..//utils/mask"
import {cpfIsValid} from "../../utils/validators"
export interface Esf {
    id:string;
    nome:string;
}
export interface Device {
    id:string;
    nome:string;
}
export interface Agente {
    id:string;
    logradouro:string;
    numero:string;
    complemento:string;
    bairro:string;
    cidade:string;
    uf:string;
    cep:string;
    celular:string;
    status:string;
    cpf:string;
    nome:string;
    rg:string;
    esf:Esf;
    device:Device;
}

const Agent = () => {
    const [agentes, setAgente] = useState<Agente[]>([])
    const [selected, setSelected] = useState<any>()
    const [pagination, setPagination] = useState<any>({count:1})
    const [mode, setMode] = useState('list')
    const {
        openAlert, 
        closeAlert, 
        openLoading, 
        closeLoading, 
        openSnackbar,
        toogleSearch,
        search,} = useApp()
        
    const [esf, setEsf] = useState([])
    const [device, setDevice] = useState([])
    const [value, setValue] = useState(0);
    const {register, handleSubmit, control, reset, formState: { errors }} = useForm({mode: "all"});

    function setError(error: any) {
        openSnackbar({
            message: error.message,
            color: "red",
            severity: 'error'
        });
    }
    
    function setInfo(info: string) {
        openSnackbar({
            message: info,
            severity: 'info'
        });
    }

    const fetchAgentes = async (options?:any) => {
        openLoading()
        try{

            const {content, totalPages, pageable:{pageNumber}} = await GET("/api/agentes", {...{filter:search}, ...options})
            setAgente(content)
            setPagination({
                count:totalPages,
                page: pageNumber+1,
            })
        }
        catch(error:any){
            setError(error);
        }
        closeLoading()
    }
    
    const fetchEsf = async () => {
        openLoading()
        try{
            const {content} = await GET("/api/esfs", {size:"1000"})
            setEsf(content)
        }
        catch(error:any){
            setError(error);
        }
        closeLoading()
    }

    const changeMode = (mode:string) =>{
        toogleSearch()
        setMode(mode)
        
    }

    const update = async (id:string, agente:Agente) =>{
        openLoading()
        try{
            await PUT(`/api/agentes/${id}`, agente);
            setInfo("Agente atualizado com sucesso!")
            changeMode("list")
            fetchAgentes()
        }catch(error:any){
            setError(error);
        }
        closeLoading()

        
    }
    
    const save = async (agente:Agente) =>{
        openLoading()
        try{
            await POST(`/api/agentes`, agente);
            setInfo("Agente salvo com sucesso!")
            changeMode("list")
            fetchAgentes()

        }catch(error:any){
            setError(error);
        }
        closeLoading()
    }
    
    const deletar = async (id:string) =>{
        openLoading()
        try{
            await DELETE(`/api/agentes/${id}`);
            setInfo("Agente foi excluido com sucesso!")
        }
        catch(error:any){
            setError(error);
        }
        closeLoading()
        fetchAgentes()
    }
    
    const fetchDevice = async () => {
        openLoading()
        try{
            const {content} = await GET("/api/devices", {size:"1000"})
            setDevice(content)

        }catch(error:any){
            setError(error);
        }
        closeLoading()
    }
    

    useEffect(() => {
        fetchAgentes();
        fetchEsf();
        fetchDevice();

    }, [])

    useEffect(()=>{
        fetchAgentes({
            size:10,
            page:1
        })
        
    },[search])
    
    
    useEffect(()=>{
        reset(selected)
    },[selected])

    

    const onDelete = (id: string, nome: string) => {
        openAlert({
            visible: true,
            description: `Os dados do agente <strong> "${nome}"</strong> serão excluidos permanentemente, Deseja continuar?`,
            title: "Deseja excluir este agente",
            options: {
                cancelButtonLabel: "Não",
                confirmButtonLabel: "Sim",
                confirmButtonColor: "orange",
                icon: "error"
            },
            onConfirm: () => {
                
                deletar(id)
                closeAlert()
            }

        })
    }

    const motionAnimation = {
        initial: {opacity: 0},
        animate: {
            opacity: 1,
            transition: {duration: 0.5}

        },
        exit: {
            opacity: 0
        }
    }


    const mphone = (v: string) => {
        if (v) {
            var r = v.replace(/\D/g, "");
            r = r.replace(/^0/, "");
            if (r.length > 10) {
                // 11+ digits. Format as 5+4.
                r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
            } else if (r.length > 5) {
                // 6..10 digits. Format as 4+4
                r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "(0XX$1) $2-$3");
            } else if (r.length > 2) {
                // 3..5 digits. Add (0XX..)
                r = r.replace(/^(\d\d)(\d{0,5})/, "(0XX$1) $2");
            } else {
                // 0..2 digits. Just add (0XX
                r = r.replace(/^(\d*)/, "(0XX$1");
            }
            return r;
        }
        return null

    }

    const editar = (agente:Agente) =>{
        setSelected(agente)
        changeMode('form')
    } 
    
    const add = () =>{
        setSelected({})
        changeMode('form')
    } 

    const List = () => <>
        <AnimatePresence>
            <motion.div
                key="list"
                {...motionAnimation}
                className="h-full w-full container mx-auto ">
                <div className="w-full">
                    <div className=" overflow-x-auto">
                        <div
                            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table className="min-w-full leading-normal">
                                <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Nome
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Dispositivo
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        ESF
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                    ></th>
                                </tr>
                                </thead>
                                <tbody>


                                {agentes.map((agente:any) => {
                                    return (
                                    <tr className={`${agente.status == 'ATIVO' ? '' : 'opacity-40'}`} key={agente.id}>
                                        <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src={agente.base64 || noAvatar}
                                                        alt=""
                                                    />

                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {agente.nome}
                                                    </p>
                                                    <p className="text-gray-600 whitespace-no-wrap">{mphone(agente.celular)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 text-start py-1 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{agente.device?.nome}</p>
                                            <p className="text-gray-600 whitespace-no-wrap">{agente.device?.id}</p>
                                        </td>
                                        <td className="px-5 text-start py-1 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{agente.esf?.nome}</p>
                                        </td>
                                        <td className="px-5 text-start py-1 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                  <span
                                                      aria-hidden
                                                      className={`absolute inset-0 bg-${agente.ativo ? 'green' : 'gray'}-200  opacity-50 rounded-full`}
                                                  ></span>
                                                  <span className="relative">{agente.status}</span>
                                                </span>
                                        </td>
                                        <td
                                            className="px-5 opacity-100 py-1 border-b border-gray-200 bg-white text-sm text-right"
                                        >
                                            <button
                                                type="button" onClick={()=>editar(agente)}
                                                className="inline-block text-gray-500 hover:text-gray-700"
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button onClick={() => onDelete(agente.id, agente.nome)}
                                                    type="button"
                                                    className="inline-block text-gray-500 hover:text-gray-700"
                                            >
                                                <FaTrashAlt/>
                                            </button>
                                        </td>
                                    </tr>)
                                })
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
        <div
            className="flex flex-column items-end justify-between p-3 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
            <div className="flex flex-row items-start">
                <Stack spacing={2}>
                    <Pagination
                        count={pagination.count}
                        page={pagination.page}
                        
                        siblingCount={1}
                        boundaryCount={1}
                        onChange={(event, value)=>{
                            fetchAgentes({
                                size:10,
                                page:value
                            })
                        }}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>

            <button onClick={add} className="px-4 py-1 text-white font-semibold bg-blue-500 rounded">
                Adicionar Agente
            </button>
        </div>
    </>


    const a11yProps = (index: number) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const TabPanel = (props: any) => {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const estados = [
        {"nome": "Selecione um estado", "sigla": null},
        {"nome": "Acre", "sigla": "AC"},
        {"nome": "Alagoas", "sigla": "AL"},
        {"nome": "Amapá", "sigla": "AP"},
        {"nome": "Amazonas", "sigla": "AM"},
        {"nome": "Bahia", "sigla": "BA"},
        {"nome": "Ceará", "sigla": "CE"},
        {"nome": "Distrito Federal", "sigla": "DF"},
        {"nome": "Espírito Santo", "sigla": "ES"},
        {"nome": "Goiás", "sigla": "GO"},
        {"nome": "Maranhão", "sigla": "MA"},
        {"nome": "Mato Grosso", "sigla": "MT"},
        {"nome": "Mato Grosso do Sul", "sigla": "MS"},
        {"nome": "Minas Gerais", "sigla": "MG"},
        {"nome": "Pará", "sigla": "PA"},
        {"nome": "Paraíba", "sigla": "PB"},
        {"nome": "Paraná", "sigla": "PR"},
        {"nome": "Pernambuco", "sigla": "PE"},
        {"nome": "Piauí", "sigla": "PI"},
        {"nome": "Rio de Janeiro", "sigla": "RJ"},
        {"nome": "Rio Grande do Norte", "sigla": "RN"},
        {"nome": "Rio Grande do Sul", "sigla": "RS"},
        {"nome": "Rondônia", "sigla": "RO"},
        {"nome": "Roraima", "sigla": "RR"},
        {"nome": "Santa Catarina", "sigla": "SC"},
        {"nome": "São Paulo", "sigla": "SP"},
        {"nome": "Sergipe", "sigla": "SE"},
        {"nome": "Tocantins", "sigla": "TO"}

    ]

    


    const onSubmit = (data:any )=> {
        if(selected?.id){
            update(selected.id, data)
        }else{
            save(data)

        }
    }
    

    const backToList = () =>{
        setSelected({})
        reset
        changeMode("list")
    }
    

   

    const Form = () => <>
  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

        <AnimatePresence>
            <motion.div
                key="form"
                {...motionAnimation}
                className="h-full w-full container mx-auto ">
                <div className="bg-white  w-full">
                    <div className=" overflow-x-auto">
                        <div className="inline-block min-w-full  overflow-hidden">
                            <div className=" p-6 ">
                                    
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Dados Pessoais" {...a11yProps(0)} />
                                        <Tab label="Outras Informações" {...a11yProps(1)} />
                                        <Tab label="Observações" {...a11yProps(2)} />
                                    </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <div className="grid  grid-cols-12 gap-4 ">
                                            
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-4 ">
                                                <TextField {...register("nome", {required: "Campo obrigatorio"})} autoComplete="off"  label="Nome do agente *"   />
                                            </FormControl>
                                            
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-5 ">
                                                <TextField 
                                                {...register("email", 
                                                    {
                                                        required: "Campo obrigatorio", 
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Email inválido"
                                                        }
                                                    }
                                                )} 
                                                error={!!errors.email} 
                                                helperText={`${errors?.email?.message}`} 

                                                autoComplete="off"  
                                                label="Email *"   
                                            />
                                            </FormControl>
                                            <div className="border col-span-3 row-span-2">

                                            </div>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-3 ">
                                                

                                                <TextField {
                                                    ...register("cpf", 
                                                        {
                                                            required: "Campo obrigatorio", 
                                                            validate: cpfIsValid
                                                        }
                                                    )} 
                                                    error={!!errors.cpf} 
                                                    helperText={`${errors.cpf?.message}`} 
                                                
                                                    autoComplete="off"  label="CPF *" onChange={(event:any)=>{
                                                        event.currentTarget.value = masks.cpf.maskEvent(event)
                                                    }}  />
                                                
                                                
                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-3 ">
                                                <TextField {...register("rg")} autoComplete="off"  label="RG"   />

                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-3 ">
                                                
                                                <TextField {
                                                    ...register("celular")} 
                                                    error={!!errors.celular} 
                                                    helperText={`<p> ${errors.celular?.message} </p>`} 
                                                
                                                    autoComplete="off"  label="Celular" 
                                                    onChange={(event:any)=>{
                                                        event.currentTarget.value = masks.phone.maskEvent(event)
                                                    }}  />
                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-5 ">
                                                <TextField {...register("logradouro")} autoComplete="off"  label="Logradouro"   />

                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-2 ">
                                                <TextField {...register("numero")} autoComplete="off"  label="Número"   />

                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-5 ">
                                                <TextField {...register("bairro")} autoComplete="off"  label="Bairro"   />

                                            </FormControl>
                                            
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-3 ">
                                                <TextField {
                                                    ...register("cep")} 
                                                    
                                                
                                                    autoComplete="off"  label="CEP" 
                                                    onChange={(event:any)=>{
                                                        event.currentTarget.value = masks.cep.maskEvent(event)
                                                    }}  />
                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-6 ">
                                                <TextField {...register("cidade")} autoComplete="off"  label="Cidade"   />

                                            </FormControl>
                                            <FormControl fullWidth sx={{ m: 1 }} className="  bg-white rounded border border-solid text-start col-span-3 ">
                                            <InputLabel  id="demo-simple-select-label">Estados</InputLabel>
                                            <Controller
                                                control={control}
                                                name="uf"
                                                render={({
                                                field: { onChange, onBlur, value, name, ref },
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                                }) => (
                                                    <Select  
                                                    id="demo-simple-select"
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Estados">
                                                        {estados.map((e:any)=><MenuItem value={e.sigla}>{e.nome}</MenuItem>)}
                                                    
                                                    </Select>
                                                )}
                                            />
                                                
                                        </FormControl>
                                            
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <Controller
                                                render={({ field: { onChange, value } }) => (
                                                    <Autocomplete fullWidth sx={{ m: 1 }} className="col-span-4"
                                                    value={value}
                                                    options={esf}
                                                    getOptionLabel={(option) => option.nome}
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Dispositivo" />}
                                                    />
                                                )}
                                                name="esf"
                                                control={control}
                                            />
                                            <Controller
                                                render={({ field: { onChange, value } }) => (
                                                    <Autocomplete fullWidth sx={{ m: 1 }} className="col-span-4"
                                                    value={value}
                                                    options={device}
                                                    getOptionLabel={(option) => option.nome}
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Dispositivo" />}
                                                    />
                                                )}
                                                name="device"
                                                control={control}
                                            />
                                            
                                        
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                    <div className="grid grid-cols-12 gap-4">
                                        <FormControl fullWidth sx={{ m: 1 }} className=" bg-white rounded border border-solid text-start col-span-12 ">
                                            <TextField multiline rows={4}  label="Observações"   />

                                        </FormControl>
                                    </div>
                                    </TabPanel>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

        <div
            className="flex flex-column items-end justify-end p-3 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
            <div className="flex flex-row items-start">

            </div>

            <button type="button"  onClick={backToList} className="px-4 py-1 text-white font-semibold bg-red-500 rounded">
                Cancelar
            </button>
            <button className="px-4 py-1 ml-2 text-white font-semibold bg-blue-500 rounded">
                Salvar
            </button>
        </div>
        </form>
    </>
    return (
        agentes && mode == 'list' ? <List/> :
            mode == 'form' ? <Form/> : null


    )
}

export default Agent;
